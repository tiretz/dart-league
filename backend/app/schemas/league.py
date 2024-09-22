from pydantic import BaseModel, Field


class CreateLeagueSchema(BaseModel):

    name: str


class LeagueSchema(BaseModel):

    id: int
    name: str
    order_index: int = Field(serialization_alias="orderIndex")


class PatchLeagueSchema(CreateLeagueSchema):

    id: int
    order_index: int = Field(validation_alias="orderIndex")
