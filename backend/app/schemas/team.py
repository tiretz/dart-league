from pydantic import BaseModel, Field

from app.schemas.league import LeagueSchema


class CreateTeamSchema(BaseModel):

    name: str
    league_id: int = Field(validation_alias="leagueId")


class TeamSchema(BaseModel):

    id: int
    name: str
    league: LeagueSchema
    number_of_players: int = Field(serialization_alias="numberOfPlayers")


class PatchTeamSchema(CreateTeamSchema):

    id: int
