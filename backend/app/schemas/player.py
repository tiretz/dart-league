from pydantic import BaseModel, Field

from app.schemas.team import TeamSchema


class CreatePlayerSchema(BaseModel):

    first_name: str = Field(validation_alias="firstName")
    last_name: str = Field(validation_alias="lastName")
    passnumber: str
    teamIds: list[int]


class PlayerSchema(BaseModel):

    id: int
    first_name: str = Field(serialization_alias="firstName")
    last_name: str = Field(serialization_alias="lastName")
    passnumber: str
    teams: list[TeamSchema]


class PatchPlayerSchema(CreatePlayerSchema):

    id: int
