from contracts import buy_me_a_coffee
from moccasin.config import get_active_network

def fund():
    active_network = get_active_network()
    coffee = buy_me_a_coffee.at("0x61B68e7E30c920879d2B7258FC6e7Cdc8de230e3")
    print(f"On network {active_network.name}, funding contract at {coffee.address}")
    coffee.fund_five_ineth(value=1511898202731011)

def moccasin_main():
    return fund()