from pydantic import BaseModel, ConfigDict


class TeamSchema(BaseModel):
    model_config = ConfigDict(from_attributes=True)
