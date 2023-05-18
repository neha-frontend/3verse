import { Dropdown } from 'react-bootstrap';

// eslint-disable-next-line no-unused-vars
import { DOWN_ARROW } from '../../assets/images';

const MarketplaceSortingDropdown = ({
  handleSelect = () => null,
  dropdownOptionSelected = 'null',
  options = [],
  dropDownElement=""
}) => (
  <Dropdown className="filter-dropdown marketplaceDropdown" onSelect={handleSelect}>
    <Dropdown.Toggle className="w-auto">
      {dropDownElement}
      {/* <p className="sort d-md-block d-none">
        Sort by <img src={DOWN_ARROW} alt="sort-arrow" className="sort-arrow" />
      </p> */}
    </Dropdown.Toggle>

    <Dropdown.Menu className="mt-0">
      {options.map((option) => (
        <Dropdown.Item
          key={option.eventKey}
          eventKey={option.eventKey}
          className={dropdownOptionSelected === option.eventKey ? 'active' : ''}>
          {option.text}
        </Dropdown.Item>
      ))}
    </Dropdown.Menu>
  </Dropdown>
);

export default MarketplaceSortingDropdown;
