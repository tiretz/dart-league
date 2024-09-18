from typing import TYPE_CHECKING

from sqlalchemy import SMALLINT, TEXT
from sqlalchemy.orm import Mapped, mapped_column, relationship

from app.models.table_base import TableBase

if TYPE_CHECKING:
    from app.models.team import TeamModel


class LeagueModel(TableBase):
    __tablename__ = "league"

    id: Mapped[int] = mapped_column(primary_key=True, autoincrement=True, index=True)
    name: Mapped[str] = mapped_column(TEXT)
    order_index: Mapped[int] = mapped_column(SMALLINT)

    teams: Mapped[list["TeamModel"]] = relationship(back_populates="league", lazy="joined")
