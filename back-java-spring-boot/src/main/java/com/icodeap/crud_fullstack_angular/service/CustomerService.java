package com.icodeap.crud_fullstack_angular.service;

import com.icodeap.crud_fullstack_angular.entity.Customer;

import java.util.List;

public interface CustomerService {
    List<Customer> findAll();
    Customer findById(Integer id);
    Customer save(Customer customer);
    void deleteById(Integer id);
    Customer update(Customer customer);
}
