# pragma version 0.4.0
"""
@license MIT
@title Buy Me A Coffee!
@author GuireWire
@notice This contract is for creating a sample funding contract
"""

from interfaces import AggregatorV3Interface
from interfaces import IERC20

import get_price_module

# Constants & Immutables
MINIMUM_THREE_USD: public(constant(uint256)) = as_wei_value(3, "ether")
MINIMUM_FIVE_USD: public(constant(uint256)) = as_wei_value(5, "ether")
MINIMUM_SEVEN_USD: public(constant(uint256)) = as_wei_value(7, "ether")
MINIMUM_TEN_USD: public(constant(uint256)) = as_wei_value(10, "ether")
MINIMUM_TWELVE_USD: public(constant(uint256)) = as_wei_value(12, "ether")
MINIMUM_FIFTEEN_USD: public(constant(uint256)) = as_wei_value(15, "ether")
LINK_TOKEN: public(immutable(IERC20))
ETH_PRICE_FEED: public(
    immutable(AggregatorV3Interface)
) 
LINK_PRICE_FEED: public(
    immutable(AggregatorV3Interface)
) 
OWNER: public(immutable(address))

# Storage
eth_funders: public(DynArray[address, 5000])
link_funders: public(DynArray[address, 5000])
funder_to_amount_funded_ineth: public(HashMap[address, uint256])
funder_to_amount_funded_inlink: public(HashMap[address, uint256])
funder_to_coffees: public(HashMap[address, uint256])


@deploy
def __init__(eth_price_feed: address, link_price_feed: address, link_token: address):
    ETH_PRICE_FEED = AggregatorV3Interface(eth_price_feed)
    LINK_PRICE_FEED = AggregatorV3Interface(link_price_feed)
    LINK_TOKEN = IERC20(link_token)
    OWNER = msg.sender


@external
@payable
def fund_five_ineth():
    self._fund_five_ineth()

@external
@payable
def fund_ten_ineth():
    self._fund_ten_ineth()

@external
@payable
def fund_fifteen_ineth():
    self._fund_fifteen_ineth()

@external
def fund_three_inlink(amount: uint256):
    self._fund_three_inlink(amount)

@external
def fund_seven_inlink(amount: uint256):
    self._fund_seven_inlink(amount)

@external
def fund_twelve_inlink(amount: uint256):
    self._fund_twelve_inlink(amount)

@internal
@payable
def _fund_five_ineth():
    """Allows users to buy 1 Coffee by sending $5 in ETH to this contract
    Have a minimum $5 amount to send
    """
    usd_value_of_eth: uint256 = get_price_module._get_eth_to_usd_rate(
        ETH_PRICE_FEED, msg.value
    )
    assert usd_value_of_eth >= MINIMUM_FIVE_USD, "Insufficient ETH for one coffee!"
    self.eth_funders.append(msg.sender)
    self.funder_to_amount_funded_ineth[msg.sender] += msg.value
    self.funder_to_coffees[msg.sender] += 1

@internal
@payable
def _fund_ten_ineth():
    """Allows users to buy 2 Coffees by sending $10 in ETH to this contract
    Have a minimum $10 amount to send
    """
    usd_value_of_eth: uint256 = get_price_module._get_eth_to_usd_rate(
        ETH_PRICE_FEED, msg.value
    )
    assert usd_value_of_eth >= MINIMUM_TEN_USD, "Insufficient ETH for two coffees!"
    self.eth_funders.append(msg.sender)
    self.funder_to_amount_funded_ineth[msg.sender] += msg.value
    self.funder_to_coffees[msg.sender] += 2

@internal
@payable
def _fund_fifteen_ineth():
    """Allows users to buy 3 Coffees by sending $15 in ETH to this contract
    Have a minimum $15 amount to send
    """
    usd_value_of_eth: uint256 = get_price_module._get_eth_to_usd_rate(
        ETH_PRICE_FEED, msg.value
    )
    assert usd_value_of_eth >= MINIMUM_FIFTEEN_USD, "Insufficient ETH for three coffees!"
    self.eth_funders.append(msg.sender)
    self.funder_to_amount_funded_ineth[msg.sender] += msg.value
    self.funder_to_coffees[msg.sender] += 3

@internal
def _fund_three_inlink(amount: uint256):
    """
    @notice User must approve this contract to spend their LINK first
    """
    usd_value_of_link: uint256 = get_price_module._get_link_to_usd_rate(
        LINK_PRICE_FEED, amount
    )
    assert usd_value_of_link >= MINIMUM_THREE_USD, "Insufficient link for one coffee!"
    
    # Transfer LINK from sender to this contract
    success: bool = extcall LINK_TOKEN.transferFrom(msg.sender, self, amount)
    assert success, "LINK transfer failed"
    
    self.link_funders.append(msg.sender)
    self.funder_to_amount_funded_inlink[msg.sender] += amount
    self.funder_to_coffees[msg.sender] += 1

@internal
def _fund_seven_inlink(amount: uint256):
    """
    @notice User must approve this contract to spend their LINK first
    """
    usd_value_of_link: uint256 = get_price_module._get_link_to_usd_rate(
        LINK_PRICE_FEED, amount
    )
    assert usd_value_of_link >= MINIMUM_SEVEN_USD, "Insufficient link for two coffees!"
    
    # Transfer LINK from sender to this contract
    success: bool = extcall LINK_TOKEN.transferFrom(msg.sender, self, amount)
    assert success, "LINK transfer failed"
    
    self.link_funders.append(msg.sender)
    self.funder_to_amount_funded_inlink[msg.sender] += amount
    self.funder_to_coffees[msg.sender] += 2

@internal
def _fund_twelve_inlink(amount: uint256):
    """
    @notice User must approve this contract to spend their LINK first
    """
    usd_value_of_link: uint256 = get_price_module._get_link_to_usd_rate(
        LINK_PRICE_FEED, amount
    )
    assert usd_value_of_link >= MINIMUM_TWELVE_USD, "Insufficient link for three coffees!"
    
    # Transfer LINK from sender to this contract
    success: bool = extcall LINK_TOKEN.transferFrom(msg.sender, self, amount)
    assert success, "LINK transfer failed"
    
    self.link_funders.append(msg.sender)
    self.funder_to_amount_funded_inlink[msg.sender] += amount
    self.funder_to_coffees[msg.sender] += 3

@external
def withdraw_eth():
    """
    @notice Take the ETH out of the contract and reset ETH funder data
    @dev Follows CEI pattern: Checks, Effects (state changes), Interactions (external calls)
    """
    # Checks (Arrange)
    assert msg.sender == OWNER, "Not the contract owner!"
    eth_balance: uint256 = self.balance

    # Effects (Act)
    for funder: address in self.eth_funders:
        self.funder_to_amount_funded_ineth[funder] = 0
    self.eth_funders = []

    # Interaction (Assert/External calls)
    raw_call(OWNER, b"", value=eth_balance)

@external
def withdraw_link():
    """
    @notice Take the LINK out of the contract and reset LINK funder data
    @dev Follows CEI pattern: Checks, Effects (state changes), Interactions (external calls)
    """
    # Checks (Arrange)
    assert msg.sender == OWNER, "Not the contract owner!"
    link_balance: uint256 = staticcall LINK_TOKEN.balanceOf(self)

    # Effects (Act)
    for funder: address in self.link_funders:
        self.funder_to_amount_funded_inlink[funder] = 0
    self.link_funders = []

    # Interaction (Assert/External calls)
    success: bool = extcall LINK_TOKEN.transfer(OWNER, link_balance)
    assert success, "Transfer failed"

@external
def withdraw_all():
    """
    @notice Withdraw both ETH and LINK from contract and reset all funder data
    @dev Follows CEI pattern: Checks, Effects (state changes), Interactions (external calls)
    """
    # Checks
    assert msg.sender == OWNER, "Not the contract owner!"
    eth_balance: uint256 = self.balance
    link_balance: uint256 = staticcall LINK_TOKEN.balanceOf(self)

    # Effects for ETH and LINK
    for funder: address in self.eth_funders:
        self.funder_to_amount_funded_ineth[funder] = 0
    self.eth_funders = []
    
    for funder: address in self.link_funders:
        self.funder_to_amount_funded_inlink[funder] = 0
    self.link_funders = []

    # Interactions
    raw_call(OWNER, b"", value=eth_balance)
    success: bool = extcall LINK_TOKEN.transfer(OWNER, link_balance)
    assert success, "Transfer failed"
    
@external
@view
def get_eth_to_usd_rate(eth_amount: uint256) -> uint256:
    return get_price_module._get_eth_to_usd_rate(ETH_PRICE_FEED, eth_amount)

@external
@view
def get_link_to_usd_rate(link_amount: uint256) -> uint256:
    return get_price_module._get_link_to_usd_rate(LINK_PRICE_FEED, link_amount)
    
@external
@payable
def __default__():
    self.eth_funders.append(msg.sender)
    self.funder_to_amount_funded_ineth[msg.sender] += msg.value
    
