import { Customer } from './customer';

describe('Customer', () => {
  it('should create an instance with required properties', () => {
    const customer = new Customer('John', 'Doe', 'john.doe@example.com', 1);
    expect(customer).toBeTruthy();
    expect(customer.firstName).toBe('John');
    expect(customer.lastName).toBe('Doe');
    expect(customer.email).toBe('john.doe@example.com');
    expect(customer.id).toBe(1);
  });

  it('should create an instance without id', () => {
    const customer = new Customer('Jane', 'Doe', 'jane.doe@example.com');
    expect(customer).toBeTruthy();
    expect(customer.id).toBeUndefined();
  });
});
