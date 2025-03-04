# 🚀 SharePoint AI Agent Dashboard (SPFx Solution)

## 📌 Overview
This project is an **SPFx-based SharePoint Online (SPO) Dashboard** that enables users to explore and interact with deployed **SPO AI Agents** within their **Microsoft 365 Tenant**. The solution provides a seamless UI where users can:

- Browse and select available AI Agents.
- View detailed agent information in a **popup modal**.
- Choose to interact with the selected agent.

This dashboard simplifies AI-powered task execution by offering a **centralized interface** for managing and utilizing SharePoint AI Agents.

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














# spfx-copilot-dashboard

## Summary

Short summary on functionality and used technologies.

[picture of the solution in action, if possible]

## Used SharePoint Framework Version

![version](https://img.shields.io/badge/version-1.20.0-green.svg)

## Applies to

- [SharePoint Framework](https://aka.ms/spfx)
- [Microsoft 365 tenant](https://docs.microsoft.com/en-us/sharepoint/dev/spfx/set-up-your-developer-tenant)

> Get your own free development tenant by subscribing to [Microsoft 365 developer program](http://aka.ms/o365devprogram)

## Prerequisites

> Any special pre-requisites?

## Solution

| Solution    | Author(s)                                               |
| ----------- | ------------------------------------------------------- |
| folder name | Author details (name, company, twitter alias with link) |

## Version history

| Version | Date             | Comments        |
| ------- | ---------------- | --------------- |
| 1.1     | March 10, 2021   | Update comment  |
| 1.0     | January 29, 2021 | Initial release |

## Disclaimer

**THIS CODE IS PROVIDED _AS IS_ WITHOUT WARRANTY OF ANY KIND, EITHER EXPRESS OR IMPLIED, INCLUDING ANY IMPLIED WARRANTIES OF FITNESS FOR A PARTICULAR PURPOSE, MERCHANTABILITY, OR NON-INFRINGEMENT.**

---

## Minimal Path to Awesome

- Clone this repository
- Ensure that you are at the solution folder
- in the command-line run:
  - **npm install**
  - **gulp serve**

> Include any additional steps as needed.

## Features

Description of the extension that expands upon high-level summary above.

This extension illustrates the following concepts:

- topic 1
- topic 2
- topic 3

> Notice that better pictures and documentation will increase the sample usage and the value you are providing for others. Thanks for your submissions advance.

> Share your web part with others through Microsoft 365 Patterns and Practices program to get visibility and exposure. More details on the community, open-source projects and other activities from http://aka.ms/m365pnp.
