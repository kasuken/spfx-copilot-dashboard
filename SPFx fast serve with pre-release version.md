# Fast-Serve with SPFx pre-release version

> [!IMPORTANT]
> The solution uses a pre-release version of SPFx. Since it's not yet fully supported by the fast-serve package, you might encounter some issues.

At the time of writing, there is no version of the `spfx-fast-serve-helpers` package that corresponds to the preview version of SPFx `1.21.0-beta.0`.

Since there is not a correct version for the SPFx preview version there are some steps that need to be performed in order to trick the fast-serve command and run the pre-release version of SPFx.

## Install the necessary packages:

```bash
npm install

spfx-fast-serve
```

This updates to the latest version of `spfx-fast-serve-helpers` to `~1.21.0-beta.0`, which isn't available yet.
  
  > [!IMPORTANT]
  > To avoid any issue regarding the mismatching version of the fast-serve package you should avoid installing the dependencies from the spfx-fast-serve command.

## Run the serve command:

```bash
npm run serve
```
