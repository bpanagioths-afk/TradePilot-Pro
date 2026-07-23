from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from app.core.deps import get_current_admin, get_db
from app.features.admin.schemas import AdminUserListItem
from app.features.admin.service import list_users
from app.models.user import User


router = APIRouter(
    prefix="/admin",
    tags=["Admin"],
)


@router.get(
    "/users",
    response_model=list[AdminUserListItem],
)
def get_admin_users(
    db: Session = Depends(get_db),
    current_admin: User = Depends(get_current_admin),
):
    return list_users(db)