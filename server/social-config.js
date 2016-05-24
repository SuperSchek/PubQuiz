/**
 * Created by jorrespijker on 17-05-16.
 */

ServiceConfiguration.configurations.remove({
    service: "facebook"
});

ServiceConfiguration.configurations.insert({
    service: "facebook",
    appId: "1006642112763779" || "1006641632763827",
    secret: "c22ea768eaaa60f40fb6e31a18a626db" || "265e4362c0f9a49ff947fe83314a81cb"
});
