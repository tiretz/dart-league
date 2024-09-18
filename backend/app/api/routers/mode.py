from fastapi import APIRouter

from app.api.dependencies.core import AsyncSessionDep
from app.schemas.mode import ModeSchema
from app.services import mode as service


router: APIRouter = APIRouter(prefix="/mode", tags=["mode"])


@router.post("", response_model=ModeSchema, description="Create new mode")
async def create_new(*, session: AsyncSessionDep):

    return await service.create_new(session)


@router.get("", response_model=list[ModeSchema], description="Get all modes")
async def get_all(*, session: AsyncSessionDep):

    return await service.get_all(session)


@router.get("/{mode_id}", response_model=ModeSchema, description="Get single mode by ID")
async def get_by_id(*, session: AsyncSessionDep, mode_id: int):

    return await service.get_by_id(session, mode_id)
