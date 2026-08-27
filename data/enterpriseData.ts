export interface EnterpriseSection {
  id: string;
  title: string;
  description: string;
  frontDescription: string;
  backHeading: string;
  highlights: string[];
  iconName: "brain" | "layers" | "zap" | "flask";
  accentColor: string;
  glowColor: string;
  borderGlow: string;
  badgeBorder: string;
  badgeBg: string;
  technologies: string[];
  code: string[];
}

export const enterpriseData: EnterpriseSection[] = [
  {
    id: "01",
    title: "PRODUCTION AI SYSTEMS",
    description: "Enterprise-grade LLM orchestration, RAG pipelines, and agentic workflows built for scale.",
    frontDescription: "Enterprise-grade LLM orchestration, RAG pipelines, and agentic workflows built for scale.",
    backHeading: "What I Build",
    highlights: [
      "LLM orchestration",
      "RAG pipelines",
      "AI agents",
      "Tool calling",
      "Vector retrieval",
    ],
    iconName: "brain",
    accentColor: "#cbd5e1",
    glowColor: "rgba(255, 255, 255, 0.08)",
    borderGlow: "rgba(255, 255, 255, 0.25)",
    badgeBorder: "rgba(255, 255, 255, 0.12)",
    badgeBg: "rgba(255, 255, 255, 0.04)",
    technologies: ["RAG", "Agents", "Vector retrieval", "Tool calling"],
    code: [
      "// AI_INFERENCE_CORE.CPP [0x7FFF5FBFFD48]",
      "#include <system/tensor_alloc.h>",
      "#include <crypto/sha256_stream.h>",
      "",
      "class ProductionInferenceEngine {",
      "private:",
      "    uint8_t*  m_pVramPtr = reinterpret_cast<uint8_t*>(0x0040A3F0);",
      "    size_t    m_ctxWindow = 0x00020000; // [131072 TOKENS]",
      "    char      m_cipherNonce[16] = {0x4A, 0x9F, 0x12, 0xCE, 0x88, 0x3D, 0xAA, 0x01};",
      "",
      "public:",
      "    int execute_rag_pipeline(const void* __restrict ctx_block) {",
      "        if (!m_pVramPtr) return -EFAULT;",
      "        // MEM_DUMP: 48 89 E5 48 83 EC 20 48 89 7D E8 48 8B 45 E8",
      "        auto* pRerankNode = static_cast<const TensorBlock*>(ctx_block);",
      "        return vector_retrieval_kernel_v4(pRerankNode, m_pVramPtr, 0xFF);",
      "    }",
      "};",
      "// TERMINAL: >> SYS_EXEC 0x4F9B OK [LATENCY: 1.42ms | INTEGRITY: 100%]"
    ]
  },
  {
    id: "02",
    title: "FULL-STACK PRODUCTS",
    description: "End-to-end web applications with modern frameworks, polished UI/UX, and robust backends.",
    frontDescription: "End-to-end web applications with modern frameworks, polished UI/UX, and robust backends.",
    backHeading: "What I Build",
    highlights: [
      "React / Next.js",
      "TypeScript",
      "REST APIs",
      "PostgreSQL",
      "Production systems",
    ],
    iconName: "layers",
    accentColor: "#cbd5e1",
    glowColor: "rgba(255, 255, 255, 0.08)",
    borderGlow: "rgba(255, 255, 255, 0.25)",
    badgeBorder: "rgba(255, 255, 255, 0.12)",
    badgeBg: "rgba(255, 255, 255, 0.04)",
    technologies: ["React", "Next.js", "TypeScript", "FastAPI"],
    code: [
      "// DISTRIBUTED_NODE_CLUSTER.CPP [0x7FFF5FBFEE10]",
      "#include <net/epoll_socket.h>",
      "#include <security/tls_cipher.h>",
      "",
      "struct ServerClusterConfig {",
      "    uint32_t    listen_port   = 0x1F90; // PORT: 8080",
      "    uint64_t    max_conn_mask = 0xFFFFFFFF00000000;",
      "    const char* pAuthSecret   = \"\\x7A\\x8F\\x33\\xD9\\xAA\\x04\\x5E\\x21\";",
      "};",
      "",
      "int init_cluster_node(ServerClusterConfig* __restrict cfg) {",
      "    void* pMemMapped = mmap(NULL, 0x100000, PROT_READ|PROT_WRITE, MAP_ANON, -1, 0);",
      "    // CIPHER: 01001100 01101111 01100001 01100100 00111010 0x8A12",
      "    if (!pMemMapped) return 0xDEAD;",
      "    return epoll_bind_workers(pMemMapped, cfg->listen_port);",
      "}",
      "// TERMINAL: >> ASYNC_POOL[0..7] ONLINE (BOUND 0x1F90) [MEM: 64MB]"
    ]
  },
  {
    id: "03",
    title: "REAL-TIME APPLICATIONS",
    description: "High-performance systems using WebSockets, WebRTC, and low-latency data streams.",
    frontDescription: "High-performance systems using WebSockets, WebRTC, and low-latency data streams.",
    backHeading: "What I Build",
    highlights: [
      "WebSockets",
      "WebRTC",
      "Live data",
      "Event-driven systems",
      "Low-latency architecture",
    ],
    iconName: "zap",
    accentColor: "#cbd5e1",
    glowColor: "rgba(255, 255, 255, 0.08)",
    borderGlow: "rgba(255, 255, 255, 0.25)",
    badgeBorder: "rgba(255, 255, 255, 0.12)",
    badgeBg: "rgba(255, 255, 255, 0.04)",
    technologies: ["WebSockets", "events", "state", "real-time communication"],
    code: [
      "// REALTIME_WS_MANAGER.CPP [0x7FFF5FBFF9A0]",
      "#include <realtime/ring_buffer.h>",
      "#include <simd/avx512_stream.h>",
      "",
      "template<typename T, size_t N = 0x4000>",
      "class LowLatencyStreamEngine {",
      "    volatile uint64_t* m_pTailPtr = (uint64_t*)0x00007FFF0040;",
      "    alignas(64) uint8_t m_packetBuffer[1024];",
      "",
      "public:",
      "    inline void broadcast_event(const T& payload) noexcept {",
      "        // PACKET_HEX: FE 3A 01 9B CC 88 12 40 77 9E F0 01",
      "        __m512i vec = _mm512_load_si512((const __m512i*)&payload);",
      "        _mm512_stream_si512((__m512i*)m_packetBuffer, vec);",
      "        _mm_sfence();",
      "    }",
      "};",
      "// TERMINAL: >> ZERO_COPY DUPLEX ESTABLISHED [TX: 0x00EA80 | JITTER: 0.08ms]"
    ]
  },
  {
    id: "04",
    title: "AI EXPERIMENTS",
    description: "Exploring the cutting edge of multi-modal models, local inference, and synthetic data.",
    frontDescription: "Exploring the cutting edge of multi-modal models, local inference, and synthetic data.",
    backHeading: "What I Explore",
    highlights: [
      "Multimodal AI",
      "Local inference",
      "AI agents",
      "Synthetic data",
      "Experimental models",
    ],
    iconName: "flask",
    accentColor: "#cbd5e1",
    glowColor: "rgba(255, 255, 255, 0.08)",
    borderGlow: "rgba(255, 255, 255, 0.25)",
    badgeBorder: "rgba(255, 255, 255, 0.12)",
    badgeBg: "rgba(255, 255, 255, 0.04)",
    technologies: ["LLM", "multimodal", "ASR", "TTS"],
    code: [
      "// MULTIMODAL_EXPERIMENTAL.CPP [0x7FFF5FBFCA20]",
      "#include <ml/quantized_kernel.h>",
      "#include <dsp/fft_spectrogram.h>",
      "",
      "extern \"C\" void* quantized_gemm_4bit(",
      "    const int8_t* __restrict W, ",
      "    const float*  __restrict X, ",
      "    size_t rows, size_t cols",
      ") {",
      "    // ENCRYPTED_WEIGHTS_SIG: 0xBF8841A0 | BLOB: \\x8E\\x19\\xFA\\x03\\x99\\xC1",
      "    register uint32_t reg_accum asm(\"r12\") = 0x00000000;",
      "    for (size_t i = 0; i < (rows >> 2); ++i) {",
      "        reg_accum ^= *(reinterpret_cast<const uint32_t*>(W + (i * 4)));",
      "    }",
      "    return reinterpret_cast<void*>(reg_accum);",
      "}",
      "// TERMINAL: >> INFERENCE_ACCELERATOR ACTIVE [INT4 KV-CACHE COMPRESSED]"
    ]
  }
];
