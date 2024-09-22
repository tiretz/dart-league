from fastapi import APIRouter

from app.api.dependencies.core import AsyncSessionDep
from app.schemas.settings import PatchSettingsSchema, SettingsSchema
from app.services import settings as service


router: APIRouter = APIRouter(prefix="/settings", tags=["settings"])


@router.get("", response_model=SettingsSchema, description="Get settings")
async def get(*, session: AsyncSessionDep):

    return await service.get(session)


@router.patch("", response_model=SettingsSchema, description="Patch settings")
async def patch(*, session: AsyncSessionDep, settings: PatchSettingsSchema):

    return await service.patch(session, settings)
