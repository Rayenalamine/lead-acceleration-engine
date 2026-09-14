package com.leadengine.config;

import java.util.List;
import lombok.Getter;
import lombok.Setter;
import org.springframework.boot.context.properties.ConfigurationProperties;

@Getter
@Setter
@ConfigurationProperties(prefix = "lead-engine")
public class LeadEngineProperties {

    private final N8n n8n = new N8n();
    private final Cors cors = new Cors();
    private final Demo demo = new Demo();
    /** Base URL n8n uses to callback into this API (host.docker.internal when n8n runs in Docker). */
    private String callbackBaseUrl = "http://host.docker.internal:8081";

    @Getter
    @Setter
    public static class N8n {
        private String webhookUrl;
        private int connectTimeoutMs = 3000;
        private int responseTimeoutMs = 120000;
    }

    @Getter
    @Setter
    public static class Cors {
        private List<String> allowedOrigins = List.of("http://localhost:5173");
    }

    @Getter
    @Setter
    public static class Demo {
        /** When true, schedules a local qualification result so Phase 2 polling works without n8n. */
        private boolean enabled = false;
        private long delayMs = 4000;
    }
}
