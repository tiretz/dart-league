from fastapi import APIRouter

from app.api.routers import game, league, mode, player, settings, team

api_router = APIRouter(prefix="/api")

api_router.include_router(game.router)
api_router.include_router(league.router)
api_router.include_router(mode.router)
api_router.include_router(player.router)
api_router.include_router(settings.router)
api_router.include_router(team.router)
