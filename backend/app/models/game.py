from typing import TYPE_CHECKING

from sqlalchemy import ForeignKey
from sqlalchemy.orm import Mapped, mapped_column, relationship

from app.models.table_base import TableBase

if TYPE_CHECKING:
    from app.models.mode import ModeModel


class GameModel(TableBase):
    __tablename__ = "game"

    id: Mapped[int] = mapped_column(primary_key=True, autoincrement=True, index=True)

    mode_id: Mapped[int] = mapped_column(ForeignKey("mode.id"))
    mode: Mapped["ModeModel"] = relationship(back_populates="games", lazy="joined")
