from interfaces import AggregatorV3Interface

PRECISION: constant(uint256) = 1 * (10**18)


@internal
@view
def _get_eth_to_usd_rate(
    eth_price_feed: AggregatorV3Interface, eth_amount: uint256
) -> uint256:
    """
    @notice Converts ETH amount to USD value using Chainlink ETH/USD price feed
    """
    price: int256 = staticcall eth_price_feed.latestAnswer()
    eth_price: uint256 = (convert(price, uint256)) * (10**10)
    eth_amount_in_usd: uint256 = (eth_price * eth_amount) // PRECISION
    return eth_amount_in_usd  # 18 0's, 18 decimal places

@internal
@view
def _get_link_to_usd_rate(
    link_price_feed: AggregatorV3Interface, link_amount: uint256
) -> uint256:
    """
    @notice Converts LINK amount to USD value using Chainlink LINK/USD price feed
    """
    price: int256 = staticcall link_price_feed.latestAnswer()
    link_price: uint256 = (convert(price, uint256)) * (10**10)
    link_amount_in_usd: uint256 = (link_price * link_amount) // PRECISION
    return link_amount_in_usd  # 18 0's, 18 decimal places

