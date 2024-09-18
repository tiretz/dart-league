from pydantic import BaseModel, ConfigDict


class CreateModeSchema(BaseModel):
    model_config = ConfigDict(from_attributes=True)

    name: str


class ModeSchema(BaseModel):
    model_config = ConfigDict(from_attributes=True)

    id: int
    name: str
    order_index: int


class PatchModeSchema(ModeSchema):
    pass
