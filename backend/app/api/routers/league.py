from fastapi import APIRouter

from app.api.dependencies.core import AsyncSessionDep
from app.schemas.league import LeagueSchema
from app.services import league as service


router: APIRouter = APIRouter(prefix="/league", tags=["league"])


@router.post("", response_model=LeagueSchema, description="Create new league")
async def create_new(*, session: AsyncSessionDep):

    return await service.create_new(session)


@router.get("", response_model=list[LeagueSchema], description="Get all leagues")
async def get_all(*, session: AsyncSessionDep):

    return await service.get_all(session)


@router.get("/{league_id}", response_model=LeagueSchema, description="Get single league by ID")
async def get_by_id(*, session: AsyncSessionDep, league_id: int):

    return await service.get_by_id(session, league_id)
