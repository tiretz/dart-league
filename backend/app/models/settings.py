from sqlalchemy.orm import Mapped, mapped_column

from app.models.table_base import TableBase


class SettingsModel(TableBase):
    __tablename__ = "settings"

    id: Mapped[int] = mapped_column(primary_key=True, autoincrement=True, index=True)
    stake: Mapped[float] = mapped_column()
