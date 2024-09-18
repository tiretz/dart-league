from typing import TYPE_CHECKING

from sqlalchemy import TEXT, Column, ForeignKey, Table
from sqlalchemy.orm import Mapped, mapped_column, relationship

from app.models.table_base import TableBase

if TYPE_CHECKING:
    from app.models.league import LeagueModel
    from app.models.player import PlayerModel


team_player_association_table = Table(
    "team_player_association_table",
    TableBase.metadata,
    Column("team_id", ForeignKey("team.id"), primary_key=True),
    Column("player_id", ForeignKey("player.id"), primary_key=True),
)


class TeamModel(TableBase):
    __tablename__ = "team"

    id: Mapped[int] = mapped_column(primary_key=True, autoincrement=True, index=True)
    name: Mapped[str] = mapped_column(TEXT)
    league_id: Mapped[int] = mapped_column(ForeignKey("league.id"))
    league: Mapped["LeagueModel"] = relationship(back_populates="teams", lazy="joined")

    players: Mapped[list["PlayerModel"]] = relationship(secondary=team_player_association_table, back_populates="teams", lazy="joined")
