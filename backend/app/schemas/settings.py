from pydantic import BaseModel, ConfigDict


class SettingsSchema(BaseModel):
    model_config = ConfigDict(from_attributes=True)

    stake: float


class PatchSettingsSchema(SettingsSchema):
    pass
