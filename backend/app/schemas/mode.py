from pydantic import BaseModel, ConfigDict


class ModeSchema(BaseModel):
    model_config = ConfigDict(from_attributes=True)

    id: int
    name: str
    order_id: int
