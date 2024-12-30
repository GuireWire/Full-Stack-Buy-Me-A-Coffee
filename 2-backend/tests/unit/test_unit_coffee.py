import boa
from eth_utils import to_wei

from tests.conftest import SEND_VALUE

RANDOM_USER = boa.env.generate_address("non-owner")

def test_price_feed_is_correct(coffee, eth_usd):
    assert coffee.PRICE_FEED() == eth_usd.address

def test_starting_values(coffee, account):
    assert coffee.MINIMUM_USD() == to_wei(5, "ether")
    assert coffee.OWNER() == account.address

def test_fund_fails_without_enough_eth(coffee):
    with boa.reverts("You must spend more ETH!"): # This allows us to test for revert
        coffee.fund()

def test_fund_with_money(coffee_funded, account):
    # Arrange
    # boa.env.set_balance(account.address, SEND_VALUE)
    # Act
    # coffee.fund(value=SEND_VALUE)
    # Assert
    funder = coffee_funded.funders(0)
    assert funder == account.address
    assert coffee_funded.funder_to_amount_funded(funder) == SEND_VALUE

def test_not_owner_cannot_withdraw(coffee_funded, account):
    # Arrange
    # boa.env.set_balance(account.address, SEND_VALUE)
    # coffee.fund(value=SEND_VALUE)
    # Act
    with boa.env.prank(RANDOM_USER):
        with boa.reverts("Not the contract owner!"):
            coffee_funded.withdraw()

def test_owner_can_withdraw(coffee_funded):
    # Arrange
    # boa.env.set_balance(coffee.OWNER(), SEND_VALUE)
    # Act
    with boa.env.prank(coffee_funded.OWNER()):
        # coffee.fund(value=SEND_VALUE)
        coffee_funded.withdraw()
    # Assert
    assert boa.env.get_balance(coffee_funded.address) == 0

def test_fund_ten_times_and_withdraw(coffee, account):
    # Arrange
    funders = [boa.env.generate_address(f"funder-{i}") for i in range(10)]  # Generate 10 unique funder addresses
    total_funded = 0

    # Act
    for funder in funders:
        boa.env.set_balance(funder, SEND_VALUE)  # Set balance for each funder
        with boa.env.prank(funder):  # Simulate each funder sending funds
            coffee.fund(value=SEND_VALUE)
            total_funded += SEND_VALUE

    owner_balance_before = boa.env.get_balance(coffee.OWNER())
    with boa.env.prank(coffee.OWNER()):
        coffee.withdraw()
    # Assert
    assert boa.env.get_balance(coffee.address) == 0
    assert boa.env.get_balance(coffee.OWNER()) == owner_balance_before + total_funded

def test_get_rate(coffee):
    assert coffee.get_eth_to_usd_rate(SEND_VALUE) > 0

def test_fund_via_fallback(coffee, account):
    # Arrange
    fund_value = SEND_VALUE  # Define the amount to send

    # Act - Send Ether to the contract (this triggers __default__ function)
    boa.env.set_balance(account.address, fund_value)  # Ensure the account has enough balance
    with boa.env.prank(account.address):  # Pass the address, not the account object
        coffee.__default__(value=fund_value)

    # Assert - Check if the contract's balance is greater than 0
    assert boa.env.get_balance(coffee.address) > 0, "Contract balance should be greater than 0"
