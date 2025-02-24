import Popup from "@/components/popup/Popup";
import Image from "next/image";
import React, { useState } from "react";

function CharacterSheetInventory({ inventory, theme, dm }) {
  const [currencies, setCurrencies] = useState([
    {
      name: "Platinum",
      amount: inventory.currency.pp,
      bg: "bg-indigo-900",
      border: "border-indigo-600",
      shadow: "shadow-indigo-900",
    },
    {
      name: "Gold",
      amount: inventory.currency.gp,
      bg: "bg-yellow-600",
      border: "border-yellow-300",
      shadow: "shadow-yellow-600",
    },
    {
      name: "Silver",
      amount: inventory.currency.sp,
      bg: "bg-gray-500",
      border: "border-gray-200",
      shadow: "shadow-gray-500",
    },
    {
      name: "Copper",
      amount: inventory.currency.cp,
      bg: "bg-orange-900",
      border: "border-orange-600",
      shadow: "shadow-orange-900",
    },
  ]);

  const [selectedCurrency, setSelectedCurrency] = useState(null);

  const updateCurrency = (currencyName, newAmount) => {
    setCurrencies((prevCurrencies) =>
      prevCurrencies.map((currency) =>
        currency.name === currencyName
          ? { ...currency, amount: newAmount ?? 0 }
          : currency
      )
    );
  };

  const currencyDialog = (
    <Popup onDismiss={() => setSelectedCurrency(null)}>
      <div
        className={`${theme.bg} border-2 ${theme.border} p-2 rounded-lg flex flex-col gap-2`}
      >
        <h3 className="text-center">{selectedCurrency?.name}</h3>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            const formData = new FormData(e.target);
            const amount = parseFloat(formData.get("amount"));
            const validAmount = isNaN(amount) ? 0 : amount;
            updateCurrency(selectedCurrency?.name, validAmount);
            setSelectedCurrency(null);
          }}
        >
          <div className="flex flex-col gap-3">
            <input
              name="amount"
              className={`rounded-lg p-1 w-[100px] ${theme.highlight} text-center text-xl focus:ring-1 ring-white focus:outline-none`}
              type="number"
              defaultValue={selectedCurrency?.amount}
            />
            <input
              className="bg-green-800 rounded-full p-1"
              type="submit"
              value="Save"
            />
          </div>
        </form>
      </div>
    </Popup>
  );

  const currencyCell = (currency) => (
    <div key={currency.name} className="flex flex-col gap-2 p-1">
      <div
        className={`flex flex-col gap-1 p-1 ${currency.bg} rounded-lg ${currency.border} border ${currency.shadow} shadow-md`}
        onClick={() => setSelectedCurrency(currency)}
      >
        <p className="text-center text-xl py-1">{currency.amount}</p>
      </div>
      <h4 className="text-sm text-center">{currency.name}</h4>
    </div>
  );

  const currencySection = (
    <>
      <div className="grid grid-cols-4 gap-2">
        {currencies.map((currency) => currencyCell(currency))}
      </div>
      {selectedCurrency?.name && currencyDialog}
    </>
  );

  const [selectedItem, setSelectedItem] = useState(null);

  const selectedItemPopup = (
    <Popup onDismiss={(e) => setSelectedItem(null)}>
      <div
        className={`${theme.bg} border-2 ${theme.border} p-2 rounded-lg min-w-[85vw] md:min-w-[30vw] md:max-w-[60vw] lg:max-w-[40vw] flex flex-col gap-2`}
      >
        <h2 className="text-xl text-center font-bold">{selectedItem?.name}</h2>
        <p className="text-xs">{selectedItem?.description}</p>
      </div>
    </Popup>
  );

  const attunedItemCell = (item) => (
    <div
      className="font-bold text-center p-1"
      onClick={() => {
        setSelectedItem(item);
      }}
    >
      {item.name}
    </div>
  );

  const attunedItemsSection = (
    <div className="grid grid-cols-1 gap-2">
      <h3 className="text-center text-xl">Attuned Magic Items</h3>
      {Array.from({ length: inventory.maxAttunedItems }, (_, index) => (
        <div
          key={index}
          className={`flex min-h-[32px] ${theme.bg} rounded-lg border ${theme.border} shadow-md ${theme.shadow}`}
        >
          {inventory.attunedMagicItems.length > index ? (
            <div className={`flex-1`}>
              {attunedItemCell(inventory.attunedMagicItems[index])}
            </div>
          ) : (
            <div className="bg-[#111] flex-1 rounded-lg"></div>
          )}
        </div>
      ))}
    </div>
  );

  const itemCell = (item) => (
    <div
      key={item.item.name}
      className="flex justify-between border-b border-opacity-40 border-white p-1 gap-2"
    >
      <p className="text-sm">{item.item.name}</p>
      <p className="text-sm">{item.quantity}</p>
    </div>
  );

  const initialFilters = {
    Weapons: {
      condition: (p) => p.category === "weapon",
      on: false,
    },
    Armor: {
      condition: (p) => p.category === "armor",
      on: false,
    },
  };
  const [backpackFilters, setBackpackFilters] = useState(initialFilters);
  const [storedFilters, setStoredFilters] = useState(initialFilters);

  const [backpackFilterDialogOpen, setBackpackFilterDialogOpen] =
    useState(false);
  const [storedFilterDialogOpen, setStoredFilterDialogOpen] = useState(false);

  const toggleBackpackFilter = (filterName) => {
    const newFilters = { ...backpackFilters };
    const newFilter = {
      ...newFilters[filterName],
      on: !newFilters[filterName].on,
    };
    newFilters[filterName] = newFilter;
    setBackpackFilters(newFilters);
  };

  const toggleStoredFilter = (filterName) => {
    const newFilters = { ...storedFilters };
    const newFilter = {
      ...newFilters[filterName],
      on: !newFilters[filterName].on,
    };
    newFilters[filterName] = newFilter;
    setStoredFilters(newFilters);
  };

  const backpackFilterDialog = (
    <Popup onDismiss={(e) => setBackpackFilterDialogOpen(false)}>
      <div
        className={`${theme.bg} border-2 ${theme.border} p-2 rounded-lg w-[280px] flex flex-col gap-2`}
      >
        <h2 className="text-xl text-center">Backpack Filters</h2>
        {Object.keys(backpackFilters).map((filterName) => (
          <div
            key={filterName}
            className="flex justify-between items-center p-1 "
            onClick={() => toggleBackpackFilter(filterName)}
          >
            <p>{filterName}</p>
            <div
              className={`rounded-full w-[40px] p-1 flex items-center duration-300 relative ${
                backpackFilters[filterName].on ? "bg-green-900" : "bg-black"
              }`}
            >
              <div
                className={`w-[12px] h-[12px] bg-white rounded-full transition-transform duration-300 ${
                  backpackFilters[filterName].on
                    ? "translate-x-[20px]"
                    : "translate-x-0"
                }`}
              ></div>
            </div>
          </div>
        ))}
      </div>
    </Popup>
  );

  const storedFilterDialog = (
    <Popup onDismiss={(e) => setStoredFilterDialogOpen(false)}>
      <div
        className={`${theme.bg} border-2 ${theme.border} p-2 rounded-lg w-[280px] flex flex-col gap-2`}
      >
        <h2 className="text-xl text-center">Stored Items Filters</h2>
        {Object.keys(storedFilters).map((filterName) => (
          <div
            key={filterName}
            className="flex justify-between items-center p-1 "
            onClick={() => toggleStoredFilter(filterName)}
          >
            <p>{filterName}</p>
            <div
              className={`rounded-full w-[40px] p-1 flex items-center duration-300 relative ${
                storedFilters[filterName].on ? "bg-green-900" : "bg-black"
              }`}
            >
              <div
                className={`w-[12px] h-[12px] bg-white rounded-full transition-transform duration-300 ${
                  storedFilters[filterName].on
                    ? "translate-x-[20px]"
                    : "translate-x-0"
                }`}
              ></div>
            </div>
          </div>
        ))}
      </div>
    </Popup>
  );

  const openBackpackFilterDialog = () => {
    setBackpackFilterDialogOpen(true);
  };

  const openStoredFilterDialog = () => {
    setStoredFilterDialogOpen(true);
  };

  const getFilteredBackpack = () => {
    const filters = Object.keys(backpackFilters).map((k) => backpackFilters[k]);
    return inventory.backpack.filter((item) => {
      if (!filters.some((filter) => filter.on)) return true;
      for (const filter of filters) {
        if (filter.condition(item)) {
          return true;
        }
      }
      return false;
    });
  };

  const getFilteredStored = () => {
    const filters = Object.keys(storedFilters).map((k) => storedFilters[k]);
    return inventory.stored.filter((item) => {
      if (!filters.some((filter) => filter.on)) return true;
      for (const filter of filters) {
        if (filter.condition(item)) {
          return true;
        }
      }
      return false;
    });
  };

  const backpackSection = (
    <div className="flex flex-col gap-2">
      <div className="relative">
        <h3 className="text-center text-xl">Backpack</h3>
        <div
          className="absolute top-0 right-0 bottom-0 flex items-center justify-center"
          onClick={() => openBackpackFilterDialog()}
        >
          <Image
            src="/icons/filter_list_icon.png"
            width={24}
            height={24}
            alt="filter backpack icon"
          />
        </div>
      </div>
      <div
        className={`${theme.bg} p-2 rounded-lg ${theme.border} border ${theme.shadow} shadow-md`}
      >
        <div className="flex justify-between px-1">
          <h5 className="bold text-lg font-bold">Item</h5>
          <h5 className="bold text-lg font-bold">#</h5>
        </div>
        <hr />
        <div className="grid grid-cols-1 gap-1 pt-1">
          {getFilteredBackpack().map((item) => itemCell(item))}
          {getFilteredBackpack().length === 0 && (
            <p className="text-center text-sm opacity-50 p-1">
              No items
              {Object.keys(backpackFilters)
                .map((k) => backpackFilters[k])
                .some((p) => p.on) && ", check filters"}
            </p>
          )}
        </div>
      </div>
      {backpackFilterDialogOpen && backpackFilterDialog}
    </div>
  );

  const storedSection = (
    <div className="flex flex-col gap-2">
      <div className="relative">
        <h3 className="text-center text-xl">Stored Items</h3>
        <div
          className="absolute top-0 right-0 bottom-0 flex items-center justify-center"
          onClick={() => openStoredFilterDialog()}
        >
          <Image
            src="/icons/filter_list_icon.png"
            width={24}
            height={24}
            alt="filter stored icon"
          />
        </div>
      </div>
      <div
        className={`${theme.bg} p-2 rounded-lg ${theme.border} border ${theme.shadow} shadow-md`}
      >
        <div className="flex justify-between px-1">
          <h5 className="bold text-lg font-bold">Item</h5>
          <h5 className="bold text-lg font-bold">#</h5>
        </div>
        <hr />
        <div className="grid grid-cols-1 gap-1 pt-1">
          {getFilteredStored().map((item) => itemCell(item))}
          {getFilteredStored().length === 0 && (
            <p className="text-center text-sm opacity-50 p-1">
              No items
              {Object.keys(storedFilters)
                .map((k) => storedFilters[k])
                .some((p) => p.on) && ", check filters"}
            </p>
          )}
        </div>
      </div>
      {storedFilterDialogOpen && storedFilterDialog}
    </div>
  );

  return (
    <div className="flex flex-col p-2 gap-4">
      {currencySection}
      {attunedItemsSection}
      {backpackSection}
      {storedSection}
      {selectedItem?.name && selectedItemPopup}
    </div>
  );
}

export default CharacterSheetInventory;
