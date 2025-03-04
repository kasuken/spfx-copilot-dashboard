# 🚀 SharePoint AI Agent Dashboard (SPFx Solution)

## 📌 Overview
This project is an **SPFx-based SharePoint Online (SPO) Dashboard** that enables users to explore and interact with deployed **SPO AI Agents** within their **Microsoft 365 Tenant**. The solution provides a seamless UI where users can:

- Browse and select available AI Agents.
- View detailed agent information in a **popup modal**.
- Choose to interact with the selected agent.

This dashboard simplifies AI-powered task execution by offering a **centralized interface** for managing and utilizing SharePoint AI Agents.

---

## 👩‍💻 SharePoint Hackathon

This project is valid for the [SharePoint Hackathon](https://adoption.microsoft.com/en-us/sharepoint/hackathon/) open from 3rd March to 17th March 2025.

![image](https://github.com/user-attachments/assets/c3a765a4-4410-4699-9a74-ef57e42c9bfb)

---

## 🎯 Features
✅ **SPFx-based web part** for easy deployment in SharePoint Online  
✅ **Dynamic agent discovery** across the tenant  
✅ **Popup modal** for detailed agent insights  
✅ **Interactive UI** to trigger agent functionalities  
✅ **Secure and seamless** SharePoint integration  

---

## 🏗️ Architecture
The solution is developed using the **SharePoint Framework (SPFx)** and integrates with **SharePoint Online AI Agent APIs**. Below is a high-level architecture diagram:

```
+-------------------------+
| SharePoint Online       |
|  - SPO Agent Dashboard  |
|  - Deployed AI Agents   |
+-------------------------+
        |
        v
+-------------------------+
| SPFx Web Part          |
|  - React UI            |
|  - API Integration     |
|  - Popup Modal         |
+-------------------------+
        |
        v
+-------------------------+
| SPO Agent APIs         |
|  - Fetch agent list    |
|  - Get agent details   |
|  - Trigger agent       |
+-------------------------+
```

---

## 🛠️ Installation & Setup
### Prerequisites
Ensure you have the following tools installed:

- Node.js (LTS version)
- Yeoman & SPFx Generator  
  ```bash
  npm install -g yo @microsoft/generator-sharepoint
  ```
- Gulp  
  ```bash
  npm install -g gulp
  ```

### Clone the Repository
```bash
git clone https://github.com/your-org/spo-agent-dashboard.git
cd spo-agent-dashboard
```

### Install Dependencies
```bash
npm install
```

### Build the Solution
```bash
gulp build
```

### Run in Development Mode
```bash
gulp serve
```
> Open **https://your-sharepoint-site/_layouts/15/workbench.aspx** to test locally.

### Deploy to SharePoint
1. Build the package:  
   ```bash
   gulp bundle --ship
   gulp package-solution --ship
   ```
2. Upload the `.sppkg` file from `./sharepoint/solution/` to the **App Catalog**.
3. Deploy the app and add it to your SharePoint site.

---

## 🖥️ Usage
1. Navigate to the **SPO Agent Dashboard** web part.
2. Browse the list of available AI Agents.
3. Click on an agent to open a **popup modal** with detailed information.
4. Decide whether to interact with the agent.

---

## 🔧 Technologies Used

![version](https://img.shields.io/badge/version-1.20.0-green.svg)

- **SharePoint Framework (SPFx)**
- **React**
- **TypeScript**
- **Fluent UI**
- **Microsoft 365 APIs**

---

## 🤝 Contributing
We welcome contributions! Follow these steps to contribute:

1. **Fork** this repository.
2. **Create** a new branch (`feature-branch`).
3. **Commit** your changes.
4. **Push** to your branch.
5. **Create a Pull Request** for review.

---

## 📜 License
This project is licensed under the **MIT License**.

---
