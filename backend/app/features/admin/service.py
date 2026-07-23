from sqlalchemy.orm import Session

from app.features.admin.repository import get_users_with_statistics
from app.features.admin.schemas import AdminUserListItem


def list_users(db: Session) -> list[AdminUserListItem]:

    users = get_users_with_statistics(db)

    return [
        AdminUserListItem(
            id=user.id,
            username=user.username,
            email=user.email,
            is_admin=user.is_admin,
            created_at=user.created_at,
            mt5_accounts_count=user.mt5_accounts_count,
            trades_count=user.trades_count,
        )
        for user in users
    ]