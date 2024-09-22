from pydantic import BaseModel, Field


class CreateModeSchema(BaseModel):

    name: str


class ModeSchema(BaseModel):

    id: int
    name: str
    order_index: int = Field(serialization_alias="orderIndex")


class PatchModeSchema(CreateModeSchema):

    id: int
    order_index: int = Field(validation_alias="orderIndex")
