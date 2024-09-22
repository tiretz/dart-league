from fastapi import APIRouter, Body, status

from app.api.dependencies.core import AsyncSessionDep
from app.schemas.mode import CreateModeSchema, ModeSchema, PatchModeSchema
from app.services import mode as service


router: APIRouter = APIRouter(prefix="/mode", tags=["mode"])


@router.post("", response_model=ModeSchema, status_code=status.HTTP_201_CREATED, description="Create mode")
async def create(*, session: AsyncSessionDep, mode: CreateModeSchema = Body()):

    return await service.create(session, mode)


@router.delete("/{mode_id}", response_model=ModeSchema, description="Delete mode")
async def delete(*, session: AsyncSessionDep, mode_id: int):

    return await service.delete(session, mode_id)


@router.get("", response_model=list[ModeSchema], description="Get all modes")
async def get_all(*, session: AsyncSessionDep):

    return await service.get_all(session)


@router.get("/{mode_id}", response_model=ModeSchema, description="Get mode by ID")
async def get_single(*, session: AsyncSessionDep, mode_id: int):

    return await service.get_single(session, mode_id)


@router.patch("/{mode_id}", response_model=ModeSchema, description="Edit mode")
async def patch(*, session: AsyncSessionDep, mode_id: int, mode: PatchModeSchema = Body()):

    return await service.patch(session, mode_id, mode)


@router.patch("", response_model=list[ModeSchema], description="Reorder modes")
async def reorder(*, session: AsyncSessionDep, modes: list[ModeSchema] = Body()):

    return await service.reorder(session, modes)
