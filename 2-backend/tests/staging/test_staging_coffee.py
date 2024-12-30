import boa
import pytest
from moccasin.config import get_active_network

from script.deploy import deploy_coffee
from tests.conftest import SEND_VALUE

active_network = get_active_network()

@pytest.mark.staging
@pytest.mark.local
# @pytest.mark.ignore_isolation
def test_can_fund_and_withdraw_live():
    price_feed = active_network.manifest_named("price_feed")
    coffee = deploy_coffee(price_feed)
    coffee.fund(value = SEND_VALUE)
    amount_funded = coffee.funder_to_amount_funded(boa.env.eoa)
    assert amount_funded == SEND_VALUE
    coffee.withdraw()
    assert boa.env.get_balance(coffee.address) == 0