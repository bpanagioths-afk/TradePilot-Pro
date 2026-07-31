import unittest
from unittest.mock import MagicMock, patch

from app.models.trade import Trade
from app.services.mt5 import repository


class ManualTradeQueryTests(unittest.TestCase):

    def _build_session_with_results(
        self,
        results,
    ):
        query = MagicMock()

        query.filter.return_value = query
        query.order_by.return_value = query
        query.all.return_value = results

        db = MagicMock()
        db.query.return_value = query

        return db

    def test_manual_ticket_match_returns_single_trade(
        self,
    ):
        manual_trade = Trade(
            id=10,
            user_id=2,
            mt5_position_id=123456,
            imported_from_mt5=False,
            mt5_account_id=None,
        )

        db = self._build_session_with_results(
            [manual_trade],
        )

        result = (
            repository
            .get_manual_trade_by_position_id(
                db=db,
                user_id=2,
                position_id=123456,
            )
        )

        self.assertIs(
            result,
            manual_trade,
        )

    def test_manual_ticket_match_returns_none_when_missing(
        self,
    ):
        db = self._build_session_with_results(
            [],
        )

        result = (
            repository
            .get_manual_trade_by_position_id(
                db=db,
                user_id=2,
                position_id=123456,
            )
        )

        self.assertIsNone(result)

    def test_manual_ticket_match_returns_none_when_ambiguous(
        self,
    ):
        first_trade = Trade(
            id=10,
            user_id=2,
            mt5_position_id=123456,
        )

        second_trade = Trade(
            id=11,
            user_id=2,
            mt5_position_id=123456,
        )

        db = self._build_session_with_results(
            [
                first_trade,
                second_trade,
            ],
        )

        result = (
            repository
            .get_manual_trade_by_position_id(
                db=db,
                user_id=2,
                position_id=123456,
            )
        )

        self.assertIsNone(result)


class GetOrCreateTradeTests(unittest.TestCase):

    def setUp(self):
        self.db = MagicMock()

        self.common_arguments = {
            "db": self.db,
            "user_id": 2,
            "account_id": 16,
            "position_id": 152406675219,
            "symbol": "USDCHF",
            "direction": "SELL",
            "entry_price": 0.8172,
            "lot_size": 0.11,
            "open_time": None,
        }

    @patch(
        "app.services.mt5.repository."
        "get_trade_by_position"
    )
    def test_existing_synced_trade_is_reused(
        self,
        get_trade_by_position,
    ):
        existing_trade = Trade(
            id=183,
            user_id=2,
            mt5_account_id=16,
            mt5_position_id=152406675219,
            imported_from_mt5=True,
        )

        get_trade_by_position.return_value = (
            existing_trade
        )

        trade, is_new = (
            repository.get_or_create_trade(
                **self.common_arguments
            )
        )

        self.assertIs(
            trade,
            existing_trade,
        )

        self.assertFalse(is_new)

    @patch(
        "app.services.mt5.repository."
        "get_manual_trade_match"
    )
    @patch(
        "app.services.mt5.repository."
        "get_manual_trade_by_position_id"
    )
    @patch(
        "app.services.mt5.repository."
        "get_trade_by_position"
    )
    def test_manual_trade_with_ticket_is_connected(
        self,
        get_trade_by_position,
        get_manual_trade_by_position_id,
        get_manual_trade_match,
    ):
        manual_trade = Trade(
            id=178,
            user_id=2,
            mt5_account_id=None,
            mt5_position_id=152406675219,
            imported_from_mt5=False,
            is_archived=False,
        )

        get_trade_by_position.return_value = None

        get_manual_trade_by_position_id.return_value = (
            manual_trade
        )

        trade, is_new = (
            repository.get_or_create_trade(
                **self.common_arguments
            )
        )

        self.assertIs(
            trade,
            manual_trade,
        )

        self.assertFalse(is_new)

        self.assertEqual(
            trade.mt5_account_id,
            16,
        )

        self.assertEqual(
            trade.mt5_position_id,
            152406675219,
        )

        self.assertTrue(
            trade.imported_from_mt5,
        )

        self.assertFalse(
            trade.is_archived,
        )

        get_manual_trade_match.assert_not_called()

    @patch(
        "app.services.mt5.repository."
        "create_trade"
    )
    @patch(
        "app.services.mt5.repository."
        "get_manual_trade_match"
    )
    @patch(
        "app.services.mt5.repository."
        "get_manual_trade_by_position_id"
    )
    @patch(
        "app.services.mt5.repository."
        "get_trade_by_position"
    )
    def test_new_trade_is_created_only_when_no_match_exists(
        self,
        get_trade_by_position,
        get_manual_trade_by_position_id,
        get_manual_trade_match,
        create_trade,
    ):
        created_trade = Trade(
            id=200,
            user_id=2,
            mt5_account_id=16,
            mt5_position_id=152406675219,
            imported_from_mt5=True,
        )

        get_trade_by_position.return_value = None

        get_manual_trade_by_position_id.return_value = (
            None
        )

        get_manual_trade_match.return_value = None

        create_trade.return_value = created_trade

        trade, is_new = (
            repository.get_or_create_trade(
                **self.common_arguments
            )
        )

        self.assertIs(
            trade,
            created_trade,
        )

        self.assertTrue(is_new)

        create_trade.assert_called_once_with(
            db=self.db,
            user_id=2,
            account_id=16,
            position_id=152406675219,
        )

    @patch(
        "app.services.mt5.repository."
        "get_manual_trade_by_position_id"
    )
    @patch(
        "app.services.mt5.repository."
        "get_trade_by_position"
    )
    def test_manual_ticket_match_does_not_require_open_time(
        self,
        get_trade_by_position,
        get_manual_trade_by_position_id,
    ):
        manual_trade = Trade(
            id=178,
            user_id=2,
            mt5_account_id=None,
            mt5_position_id=152406675219,
            imported_from_mt5=False,
        )

        get_trade_by_position.return_value = None

        get_manual_trade_by_position_id.return_value = (
            manual_trade
        )

        arguments = {
            **self.common_arguments,
            "open_time": None,
        }

        trade, is_new = (
            repository.get_or_create_trade(
                **arguments
            )
        )

        self.assertIs(
            trade,
            manual_trade,
        )

        self.assertFalse(is_new)


if __name__ == "__main__":
    unittest.main()