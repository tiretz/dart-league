from pydantic import BaseModel, ConfigDict


class CreateLeagueSchema(BaseModel):
    model_config = ConfigDict(from_attributes=True)

    name: str


class LeagueSchema(BaseModel):
    model_config = ConfigDict(from_attributes=True)

    id: int
    name: str
    order_index: int


class PatchLeagueSchema(LeagueSchema):
    pass
