from fastapi import APIRouter

from app.api.dependencies.core import AsyncSessionDep
from app.schemas.team import TeamSchema
from app.services import team as service


router: APIRouter = APIRouter(prefix="/team", tags=["team"])


@router.post("", response_model=TeamSchema, description="Create new team")
async def create_new(*, session: AsyncSessionDep):

    return await service.create(session)


@router.get("", response_model=list[TeamSchema], description="Get all teams")
async def get_all(*, session: AsyncSessionDep):

    return await service.get_all(session)


@router.get("/{team_id}", response_model=TeamSchema, description="Get single team by ID")
async def get_by_id(*, session: AsyncSessionDep, team_id: int):

    return await service.get_by_id(session, team_id)
