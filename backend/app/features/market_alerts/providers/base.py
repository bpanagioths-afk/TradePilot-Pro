from abc import ABC, abstractmethod
from datetime import date
from typing import Any


class MarketAlertsProvider(ABC):
    @abstractmethod
    def fetch_events(
        self,
        start_date: date,
        end_date: date,
    ) -> list[dict[str, Any]]:
        raise NotImplementedError
