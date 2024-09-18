from sqlalchemy import TEXT
from sqlalchemy.orm import Mapped, mapped_column, relationship

from app.models.table_base import TableBase
from app.models.team import TeamModel, team_player_association_table


class PlayerModel(TableBase):
    __tablename__ = "player"

    id: Mapped[int] = mapped_column(primary_key=True, autoincrement=True, index=True)
    first_name: Mapped[str] = mapped_column(TEXT)
    last_name: Mapped[str] = mapped_column(TEXT)
    passnumber: Mapped[str] = mapped_column(TEXT)

    teams: Mapped[list[TeamModel]] = relationship(secondary=team_player_association_table, back_populates="players", lazy="joined")
