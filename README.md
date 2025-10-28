# Github Explorer
by Vu nguyen
  
### What decisions did I make?
- Applied the MVVM architecture for this demo.
- Organized the folder structure following the Clean Architecture pattern — each feature folder (module) includes components such as data layer, entity layer, repository, and presentation layer.
- Used `@react-navigation` for navigation management.
- Used `Redux Toolkit` for state management.
- Used `inversify` to support Dependency Injection.
- Used `@react-native-vector-icons` to display Material icons.
- Implemented image caching using the `@georstat/react-native-image-cache` package.
- Supported local storage caching with `react-native-mmkv`.

### Trade-offs
Applying MVVM and Clean Architecture to a project with only a few features makes it somewhat bulky, but it allows easier scalability when adding new features and makes it simpler to follow the SOLID principles.

### If I had more time
I would look for a better approach to data caching instead of using simple key-value storage with MMKV as I currently do.

### Demo video
[https://github.com/nwanvu93/github-explorer/raw/refs/heads/main/demo.mp4](https://github.com/nwanvu93/github-explorer/raw/refs/heads/main/demo.mp4)
