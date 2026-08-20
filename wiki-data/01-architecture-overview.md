# 🏛️ Enterprise Infrastructure Architecture Overview

Welcome to the **Docs-as-Code Knowledge Portal**. This portal provides real-time access to technical architecture standards, operational runbooks, and security hardening baselines.

---

## 🎯 Architecture Pillars

1. **Zero-Trust Network Isolation**: All virtual networks utilize strict Network Security Groups (NSGs) and Pod NetworkPolicies.
2. **Automated Fleet Governance**: Centralized configuration management using Red Hat AWX and Terraform IaC pipelines.
3. **Continuous Reliability**: Multi-node Kubernetes clusters with GitOps delivery via ArgoCD.

```bash
# Verify cluster deployment health
kubectl get nodes -o wide
```
