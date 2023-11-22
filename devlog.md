2023-11-22 19:47:55
I am creating this file to log my thoughts and progress on the development of this project. It is not meant to be documentation but rather context for the decisions I make.

2023-11-22 19:55:29
I am going to start by creating a domain model visualize the problem.

2023-11-22 20:12:48
I have a first draft of the domain model. Will identify the use cases next.

2023-11-22 20:17:08
2 actors and 3 use cases identified.

2023-11-22 20:19:48
Tentatively identified a new use case for the host to be able arrange the tables in the restaurant.

2023-11-22 20:21:23
The instructions put emphasis on performance. I prefeer to focus on correctness first and then optimize for performance. I will use a TDD approach to develop the solution.

2023-11-22 20:43:46
I decided to start with some acceptance tests describing the main use cases. I am using the Gherkin syntax to write the tests. This is sometimes called walking skeleton.
This tests will fail because the code is not implemented yet, but they will go green as the solution evolves.

2023-11-22 20:45:47
I will TDD the solution using the outside-in approach starting with from the Restaurant class using the provided interface.
