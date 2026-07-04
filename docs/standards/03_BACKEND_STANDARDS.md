# Backend Standards

Model → Schema → Service → Router → React API → React UI

Routers stay thin.
Business logic belongs in services.
Use Pydantic schemas.
Use Depends(get_db).
