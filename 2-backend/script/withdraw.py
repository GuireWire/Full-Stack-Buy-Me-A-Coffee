from moccasin.config import get_active_network
from src import buy_me_a_coffee


def withdraw():
    active_network = get_active_network()
    coffee = buy_me_a_coffee.at("0xFc2B6Ab7a9f6CC3Bc671Eed34d0d40A4AAb78958")
    print(f"On network {active_network.name}, withdrawing from {coffee.address}")
    coffee.withdraw()


def moccasin_main():
    return withdraw()
