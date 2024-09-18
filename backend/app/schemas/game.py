from pydantic import BaseModel, ConfigDict


class GameSchema(BaseModel):
    model_config = ConfigDict(from_attributes=True)
