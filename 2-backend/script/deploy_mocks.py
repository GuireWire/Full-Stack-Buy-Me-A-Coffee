from moccasin.boa_tools import VyperContract
from src.mocks import mocks_v3_aggregator

STARTING_DECIMALS = 8 # Because ETH/USD is 8 decimals refer to Chainlink Price Feed Docs
STARTING_PRICE = int(2000e8)# $2000 is the same as 200000000000

def deploy_feed() -> VyperContract:
    return mocks_v3_aggregator.deploy(STARTING_DECIMALS, STARTING_PRICE)

def moccasin_main() -> VyperContract:
    return deploy_feed()