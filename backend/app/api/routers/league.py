from fastapi import APIRouter, Body, status

from app.api.dependencies.core import AsyncSessionDep
from app.schemas.league import CreateLeagueSchema, LeagueSchema, PatchLeagueSchema
from app.services import league as service


router: APIRouter = APIRouter(prefix="/league", tags=["league"])


@router.post("", response_model=LeagueSchema, status_code=status.HTTP_201_CREATED, description="Create league")
async def create(*, session: AsyncSessionDep, league: CreateLeagueSchema = Body()):

    return await service.create(session, league)


@router.delete("/{league_id}", response_model=LeagueSchema, description="Delete league")
async def delete(*, session: AsyncSessionDep, league_id: int):

    return await service.delete(session, league_id)


@router.get("", response_model=list[LeagueSchema], description="Get all leagues")
async def get_all(*, session: AsyncSessionDep):

    return await service.get_all(session)


@router.get("/{league_id}", response_model=LeagueSchema, description="Get league by ID")
async def get_single(*, session: AsyncSessionDep, league_id: int):

    return await service.get_single(session, league_id)


@router.patch("/{league_id}", response_model=LeagueSchema, description="Edit league")
async def patch(*, session: AsyncSessionDep, league_id: int, league: PatchLeagueSchema = Body()):

    return await service.patch(session, league_id, league)


@router.patch("", response_model=list[LeagueSchema], description="Reorder leagues")
async def reorder(*, session: AsyncSessionDep, leagues: list[LeagueSchema] = Body()):

    return await service.reorder(session, leagues)
