from fastapi import APIRouter, Body, status

from app.api.dependencies.core import AsyncSessionDep
from app.schemas.team import CreateTeamSchema, PatchTeamSchema, TeamSchema
from app.services import team as service


router: APIRouter = APIRouter(prefix="/team", tags=["team"])


@router.post("", response_model=TeamSchema, status_code=status.HTTP_201_CREATED, description="Create new home team")
async def create(*, session: AsyncSessionDep, team: CreateTeamSchema = Body()):

    return await service.create(session, team)


@router.delete("/{team_id}", response_model=TeamSchema, description="Delete home team")
async def delete(*, session: AsyncSessionDep, team_id: int):

    return await service.delete(session, team_id)


@router.get("", response_model=list[TeamSchema], description="Get all home teams")
async def get_all(*, session: AsyncSessionDep):

    return await service.get_all(session)


@router.get("/{team_id}", response_model=TeamSchema, description="Get home team by ID")
async def get_single(*, session: AsyncSessionDep, team_id: int):

    return await service.get_single(session, team_id)


@router.patch("/{team_id}", response_model=TeamSchema, description="Edit home team")
async def patch(*, session: AsyncSessionDep, team_id: int, team: PatchTeamSchema = Body()):

    return await service.patch(session, team_id, team)
