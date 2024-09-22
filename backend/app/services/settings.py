from fastapi import HTTPException
from sqlalchemy import select
from sqlalchemy.ext.asyncio import AsyncSession

from app.models.settings import SettingsModel
from app.schemas.settings import PatchSettingsSchema


async def get(session: AsyncSession) -> SettingsModel:

    settings: SettingsModel | None = (await session.scalars(select(SettingsModel))).first()

    if not settings:
        raise HTTPException(status_code=404, detail="Settings not found")

    return settings


async def patch(session: AsyncSession, patch_settings: PatchSettingsSchema) -> SettingsModel:

    settings: SettingsModel = await get(session)

    settings.stake = patch_settings.stake

    session.add(settings)

    await session.commit()

    return await get(session)
