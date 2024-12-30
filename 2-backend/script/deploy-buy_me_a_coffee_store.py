from moccasin.boa_tools import VyperContract
from moccasin.config import get_active_network
from contracts import buy_me_a_coffee_store


def deploy_coffee(
    eth_price_feed: VyperContract,
    link_price_feed: VyperContract,
    link_token: VyperContract,
) -> VyperContract:
    print("Using ETH price feed:", eth_price_feed.address)
    print("Using LINK price feed:", link_price_feed.address)
    print("Using LINK token:", link_token.address)
    coffee: VyperContract = buy_me_a_coffee_store.deploy(
        eth_price_feed.address, link_price_feed.address, link_token.address
    )
    print("Deployed coffee contract at:", coffee.address)
    return coffee


def moccasin_main() -> VyperContract:
    active_network = get_active_network()
    eth_price_feed = active_network.manifest_named("eth_price_feed")
    link_price_feed = active_network.manifest_named("link_price_feed")
    link_token = active_network.manifest_named("link_token")
    coffee = deploy_coffee(eth_price_feed, link_price_feed, link_token)
    if (
        active_network.has_explorer()
        and active_network.is_local_or_forked_network() is False
    ):
        print("Verifying contract on explorer...")
        result = active_network.moccasin_verify(coffee)
        result.wait_for_verification()
    return coffee
