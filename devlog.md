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

2023-11-22 21:09:48
Not used to plain JS anymore. I spent some time with basic setup and configuration.
I have the first test passing and the main classes created.

2023-11-22 21:27:39
Basic implementation of the Restaurant class. I am using a simple array to store data. I will refactor this later to use a more appropriate data structure since the instructions mention performance.

2023-11-22 21:49:28
Refactored the data layer to isolate from use cases logic and better focus on performance.

2023-11-22 21:52:49
Acceptance tests passing.

2023-11-22 21:53:14
I will start working on performance now. I will guide myself by the tests and measure the performance of the solution on different implementations.

2023-11-23 11:59:43
Catch a bug while testinmg performance. Added a new test to reproduce the bug and fix it.

2023-11-23 12:06:45
With initial performance tests in place I will start working on the performance of the solution.
First idea is to use a Map to store the groups and a Set to store tables. Will use an array for the waiting groups to respent the arrival order.

2023-11-23 17:05:02
Map improved performance on group searches. Set was not a good idea. I'll keep the array
