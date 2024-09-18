from contextlib import asynccontextmanager
from typing import Any, AsyncGenerator, AsyncIterator

from sqlalchemy import inspect
from sqlalchemy.ext.asyncio import AsyncConnection, AsyncSession, async_sessionmaker, create_async_engine

from app.config import settings
from app.models.game import GameModel
from app.models.league import LeagueModel
from app.models.mode import ModeModel
from app.models.table_base import TableBase


class DatabaseSessionManager:

    def __init__(self, host: str, engine_kwargs: dict[str, Any] = {}):

        self._engine = create_async_engine(host, **engine_kwargs)
        self._sessionmaker = async_sessionmaker(autocommit=False, bind=self._engine, expire_on_commit=False)

    async def __add_initial_data(self) -> None:

        async with self.session() as session:

            try:

                self.__add_initial_leagues(session)
                self.__add_initial_modes(session)

                await session.commit()

            finally:
                await session.close()

    def __add_initial_leagues(self, session: AsyncSession):

        session.add(LeagueModel(name="A1", order_id=0))
        session.add(LeagueModel(name="A2", order_id=1))
        session.add(LeagueModel(name="B1", order_id=2))
        session.add(LeagueModel(name="B2", order_id=3))
        session.add(LeagueModel(name="B3", order_id=4))
        session.add(LeagueModel(name="C1", order_id=5))
        session.add(LeagueModel(name="C2", order_id=6))
        session.add(LeagueModel(name="C3", order_id=7))
        session.add(LeagueModel(name="C4", order_id=8))
        session.add(LeagueModel(name="C5", order_id=9))
        session.add(LeagueModel(name="BZ", order_id=10))
        session.add(LeagueModel(name="PO", order_id=11))

    def __add_initial_modes(self, session: AsyncSession):

        session.add(ModeModel(name="301SO", order_id=0))
        session.add(ModeModel(name="301MO", order_id=1))
        session.add(ModeModel(name="501SO", order_id=2))
        session.add(ModeModel(name="501DO", order_id=3))
        session.add(ModeModel(name="501MO", order_id=4))

    async def close(self):

        if self._engine is None:
            raise Exception("DatabaseSessionManager is not initialized")

        await self._engine.dispose()

        self._engine = None
        self._sessionmaker = None

    @asynccontextmanager
    async def connect(self) -> AsyncIterator[AsyncConnection]:

        if self._engine is None:
            raise Exception("DatabaseSessionManager is not initialized")

        async with self._engine.begin() as connection:

            try:
                yield connection

            except Exception:
                await connection.rollback()
                raise

    async def init(self) -> None:

        if self._engine is None:
            raise Exception("DatabaseSessionManager is not initialized")

        should_add_initial_data: bool = False

        async with self._engine.begin() as connection:

            if not await connection.run_sync(lambda sync_conn: inspect(sync_conn).has_table(GameModel.__tablename__)):
                should_add_initial_data = True

            await connection.run_sync(TableBase.metadata.create_all)

        if should_add_initial_data:
            await self.__add_initial_data()

    @asynccontextmanager
    async def session(self) -> AsyncIterator[AsyncSession]:

        if self._sessionmaker is None:
            raise Exception("DatabaseSessionManager is not initialized")

        session = self._sessionmaker()

        try:
            yield session

        except Exception:
            await session.rollback()
            raise

        finally:
            await session.close()


sessionmanager = DatabaseSessionManager(f"{settings.SQLALCHEMY_DATABASE_URI}", {"echo": settings.echo_sql})


async def get_async_session() -> AsyncGenerator[AsyncSession, None]:

    async with sessionmanager.session() as session:
        try:
            yield session

        finally:
            await session.close()
