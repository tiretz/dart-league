from pydantic import BaseModel, ConfigDict


class PlayerSchema(BaseModel):
    model_config = ConfigDict(from_attributes=True)
