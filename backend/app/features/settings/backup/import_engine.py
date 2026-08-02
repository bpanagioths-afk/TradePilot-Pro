from collections.abc import Iterable
from typing import Protocol

from sqlalchemy.orm import Session

from app.features.settings.schemas import (
    BackupExportResponse,
    BackupImportSectionPreview,
    BackupImportSectionResult,
)
from app.models.user import User


class BackupImporter(Protocol):
    section_name: str

    def preview(
        self,
        *,
        db: Session,
        current_user: User,
        backup: BackupExportResponse,
    ) -> BackupImportSectionPreview:
        ...

    def import_data(
        self,
        *,
        db: Session,
        current_user: User,
        backup: BackupExportResponse,
    ) -> BackupImportSectionResult:
        ...


class BackupImportEngine:
    def __init__(
        self,
        importers: Iterable[BackupImporter],
    ) -> None:
        self._importers = tuple(importers)

    def preview(
        self,
        *,
        db: Session,
        current_user: User,
        backup: BackupExportResponse,
    ) -> dict[str, BackupImportSectionPreview]:
        return {
            importer.section_name: importer.preview(
                db=db,
                current_user=current_user,
                backup=backup,
            )
            for importer in self._importers
        }

    def import_merge(
        self,
        *,
        db: Session,
        current_user: User,
        backup: BackupExportResponse,
    ) -> dict[str, BackupImportSectionResult]:
        results = {}

        try:
            for importer in self._importers:
                results[importer.section_name] = (
                    importer.import_data(
                        db=db,
                        current_user=current_user,
                        backup=backup,
                    )
                )

            db.commit()
        except Exception:
            db.rollback()
            raise

        return results
